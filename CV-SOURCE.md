# Master CV — Source & Update Process

The canonical "Master CV" served from this site (`public/anthony-penwright-cv.pdf`) is
generated from five source variants in `d:\CV Anthony\`:

- `Anthony Penwright Bio + History CV 2025.pdf` — narrative bio + full role list
- `Anthony Penwright MD SmartCity CV.pdf` — 4 frameworks, standards, DMCC/NEOM case studies (richest content)
- `Anthony Penwright Skyways Director CV.pdf` — aviation/airports angle
- `Anto_Penwright_Maaden_OT_Director_CV.pdf` — industrial/OT/mining angle
- `Anthony_Penwright_2025_CV_With_Photo.pdf` — generic recruiter variant

## Outputs

- `public/anthony-penwright-cv.pdf` — primary; served by site "Download CV" buttons
- `public/anthony-penwright-cv.docx` — editable source

## To update

Two options:

**1. Quick edits.** Open `public/anthony-penwright-cv.docx` in Word, edit, then
export to PDF (`File → Export → Create PDF/XPS`) overwriting `anthony-penwright-cv.pdf`.

**2. Regenerate from scratch.** Edit `scripts/build_cv.py` and run:

```bash
python scripts/build_cv.py
```

The script writes both DOCX and PDF. PDF conversion uses `docx2pdf` which drives
Microsoft Word via COM — it only works on a Windows machine with Word installed.
On other environments, fall back to LibreOffice: `soffice --headless --convert-to pdf public/anthony-penwright-cv.docx`.
