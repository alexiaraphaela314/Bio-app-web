"""Verify the extracted BioMundo package against its SHA-256 manifest."""
from pathlib import Path
import hashlib
import json
import sys

ROOT = Path(__file__).resolve().parents[1]

def main() -> int:
    try:
        manifest = json.loads((ROOT / 'MANIFEST-SHA256.json').read_text(encoding='utf-8'))
    except (OSError, ValueError) as error:
        print(f'ERRO: nao foi possivel ler o manifesto: {error}')
        return 2
    errors = []
    for item in manifest['files']:
        path = (ROOT / item['path']).resolve()
        if not path.is_relative_to(ROOT.resolve()):
            errors.append(f"Caminho invalido: {item['path']}")
            continue
        if not path.is_file():
            errors.append(f"Ausente: {item['path']}")
            continue
        data = path.read_bytes()
        if len(data) != item['bytes'] or hashlib.sha256(data).hexdigest() != item['sha256']:
            errors.append(f"Alterado: {item['path']}")
    if errors:
        print('\n'.join(errors))
        return 1
    print(f"OK: {len(manifest['files'])} arquivos identicos ao manifesto.")
    return 0

if __name__ == '__main__':
    sys.exit(main())
