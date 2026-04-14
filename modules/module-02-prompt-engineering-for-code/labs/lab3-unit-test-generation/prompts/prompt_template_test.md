You are a pytest expert. Please inspect the following functions and generate a new test module. Use clear test names, keep tests independent, and import only what is needed.

Functions to test:
```python
def calculate_final_score(base_score: float, bonus_pct: float, penalty: float) -> float:
    """Return the final game score after applying a percentage bonus and a fixed penalty."""
    bonus_amount = base_score * bonus_pct / 100
    final = base_score + bonus_amount - penalty
    return round(final, 2)

def is_eligible_for_reward(score: float, threshold: float = 75.0) -> bool:
    """Check whether a participant meets the minimum threshold for a reward."""
    return score >= threshold
```

Behavior to assert:
- `calculate_final_score` applies the bonus percentage correctly, e.g. `base_score=100`, `bonus_pct=10`, `penalty=5` should return `105.00`.
- `calculate_final_score` handles zero bonus, negative bonus, and positive or zero penalties correctly.
- `calculate_final_score` returns consistent two-decimal results and uses `pytest.approx` for comparisons when rounding might be ambiguous, such as `base_score=33.333`, `bonus_pct=10`, `penalty=1`.
- `is_eligible_for_reward` returns `True` when the score equals or exceeds the threshold, e.g. `score=75.0` with default threshold.
- `is_eligible_for_reward` returns `False` when the score is below the threshold, e.g. `score=74.99` with default threshold.
- `is_eligible_for_reward` uses the default threshold of `75.0` when the threshold argument is omitted, and supports custom thresholds.

Constraints:
- Output valid Python using `pytest`.
- Use only the necessary imports from `pytest`.
- Avoid fixtures unless absolutely needed; prefer independent plain test functions.
- Require the assistant to assert floats with `pytest.approx` when rounding might be ambiguous.
- Keep tests small and focused, with one logical assertion per test.
