def validate_penalty_points(severity: str, points: int) -> bool:
    ranges = {
        "Low":    (5,  20),
        "Medium": (20, 50),
        "High":   (50, 100),
    }
    lo, hi = ranges.get(severity, (0, 0))
    return lo <= points <= hi
