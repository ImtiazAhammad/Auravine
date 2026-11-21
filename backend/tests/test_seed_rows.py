import json
from pathlib import Path

from app.seed.mapping import build_seed
from app.seed.rows import main

FIXTURE_PATH = Path(__file__).parent / "fixtures" / "portfolio_sample.json"


def test_rows_file_equals_build_seed_output(tmp_path):
    out = tmp_path / "rows.json"
    main([str(FIXTURE_PATH), str(out)])
    expected = build_seed(json.loads(FIXTURE_PATH.read_text()))
    assert json.loads(out.read_text()) == expected
