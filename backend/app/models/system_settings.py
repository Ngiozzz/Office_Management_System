import uuid
from sqlalchemy import Column, String, Text
from app.db.base import Base, TimestampMixin


class SystemSettings(Base, TimestampMixin):
    __tablename__ = "system_settings"

    id    = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    key   = Column(String, unique=True, nullable=False)
    value = Column(Text, nullable=True)
    description = Column(String, nullable=True)
