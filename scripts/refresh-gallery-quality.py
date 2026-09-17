#!/usr/bin/env python3
"""Rebuild gallery full images from desktop originals and retina thumbs."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageOps

SITE = Path("/Users/raelzhang/Documents/Codex/2026-09-07/6-codex-skill-codex-workflow-github/outputs/zhangrui-portfolio/public")
GALLERY = SITE / "gallery"
THUMBS = SITE / "gallery-thumbs"
ORIG = Path("/Users/raelzhang/Desktop/日常项目/个人简历/个人网站素材")

EXTS = {".jpg", ".jpeg", ".webp", ".png"}
FULL_MAX = 2560
THUMB_MAX = 1440
MATCH_LIMIT = 40
JPEG_QUALITY = 90
WEBP_QUALITY = 88
THUMB_JPEG_QUALITY = 86
THUMB_WEBP_QUALITY = 82


def fingerprint(path: Path, size: int = 24) -> tuple[int, ...]:
    im = Image.open(path).convert("L")
    im = im.resize((size, size), Image.Resampling.BILINEAR)
    px = list(im.getdata())
    avg = sum(px) / len(px)
    return tuple(1 if p > avg else 0 for p in px)


def hamming(a: tuple[int, ...], b: tuple[int, ...]) -> int:
    return sum(x != y for x, y in zip(a, b))


def collect(root: Path, skip_parts: tuple[str, ...] = ()) -> list[dict]:
    items = []
    for path in sorted(root.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in EXTS:
            continue
        if any(part in path.parts for part in skip_parts):
            continue
        if path.name.startswith("poster-"):
            continue
        with Image.open(path) as im:
            items.append(
                {
                    "path": path,
                    "rel": str(path.relative_to(root)),
                    "size": im.size,
                    "fp": fingerprint(path),
                }
            )
    return items


def fit_size(size: tuple[int, int], max_edge: int) -> tuple[int, int]:
    width, height = size
    longest = max(width, height)
    if longest <= max_edge:
        return width, height
    scale = max_edge / longest
    return max(1, round(width * scale)), max(1, round(height * scale))


def prepare(im: Image.Image) -> Image.Image:
    im = ImageOps.exif_transpose(im)
    if im.mode in {"RGBA", "LA"}:
        bg = Image.new("RGB", im.size, (8, 10, 12))
        bg.paste(im, mask=im.split()[-1])
        return bg
    if im.mode == "P":
        return im.convert("RGBA").convert("RGB")
    if im.mode != "RGB":
        return im.convert("RGB")
    return im


def save_image(im: Image.Image, dest: Path, quality: int) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    suffix = dest.suffix.lower()
    if suffix in {".jpg", ".jpeg"}:
        im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True, subsampling=1)
    elif suffix == ".webp":
        im.save(dest, "WEBP", quality=quality, method=6)
    else:
        im.save(dest)


def encode(src: Path, dest: Path, max_edge: int, quality: int) -> tuple[int, int]:
    with Image.open(src) as raw:
        im = prepare(raw)
        target = fit_size(im.size, max_edge)
        if target != im.size:
            im = im.resize(target, Image.Resampling.LANCZOS)
        save_image(im, dest, quality)
        return im.size


def main() -> None:
    site_items = collect(GALLERY)
    orig_items = collect(ORIG, skip_parts=(".WeDrive", ".Temp", "__MACOSX"))
    print(f"site={len(site_items)} originals={len(orig_items)}")

    replaced = 0
    skipped = 0
    thumbs = 0

    for site in site_items:
        ranked = sorted(
            ((hamming(site["fp"], orig["fp"]), orig["rel"], orig) for orig in orig_items),
            key=lambda item: (item[0], item[1]),
        )
        dist, _rel, orig = ranked[0]
        dest = site["path"]
        source = dest
        if dist <= MATCH_LIMIT:
            source = orig["path"]
            width, height = encode(source, dest, FULL_MAX, JPEG_QUALITY if dest.suffix.lower() in {".jpg", ".jpeg"} else WEBP_QUALITY)
            print(f"REPLACE {site['rel']} d={dist} {site['size'][0]}x{site['size'][1]} <- {orig['size'][0]}x{orig['size'][1]} => {width}x{height}")
            replaced += 1
        else:
            print(f"KEEP   {site['rel']} best={orig['rel']} d={dist}")
            skipped += 1

        thumb = THUMBS / dest.relative_to(GALLERY)
        encode(dest, thumb, THUMB_MAX, THUMB_JPEG_QUALITY if thumb.suffix.lower() in {".jpg", ".jpeg"} else THUMB_WEBP_QUALITY)
        thumbs += 1

    print(f"done replaced={replaced} kept={skipped} thumbs={thumbs}")


if __name__ == "__main__":
    main()
