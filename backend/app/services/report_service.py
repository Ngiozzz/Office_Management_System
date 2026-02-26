from sqlalchemy.orm import Session


class ReportService:
    def __init__(self, db: Session):
        self.db = db

    def generate_org_report(self) -> dict:
        # TODO: aggregate org-wide metrics for Director
        return {}

    def generate_department_report(self, department_id: str) -> dict:
        # TODO: aggregate department metrics
        return {}
