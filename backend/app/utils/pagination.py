from typing import TypeVar, List
from pydantic import BaseModel

T = TypeVar("T")


def paginate(items: List, page: int, page_size: int) -> dict:
    start = (page - 1) * page_size
    end   = start + page_size
    return {
        "total":     len(items),
        "page":      page,
        "page_size": page_size,
        "items":     items[start:end],
    }
