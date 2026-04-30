import uuid
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta

class CalendarEngine:
    """Core scheduling engine for service continuity events."""
    
    def __init__(self):
        self.events = {}

    def schedule_event(self, title: str, event_type: str, start_time: datetime, duration_hours: int, services: List[str]) -> str:
        event_id = str(uuid.uuid4())
        end_time = start_time + timedelta(hours=duration_hours)
        self.events[event_id] = {
            "id": event_id,
            "title": title,
            "type": event_type,
            "start": start_time,
            "end": end_time,
            "services": services,
            "status": "PROPOSED",
            "created_at": datetime.utcnow()
        }
        return event_id

    def list_events(self) -> List[Dict]:
        return list(self.events.values())

class ConflictDetectionEngine:
    """Detects overlapping events and service dependency conflicts."""
    
    def find_conflicts(self, new_event: Dict, existing_events: List[Dict]) -> List[Dict]:
        conflicts = []
        for e in existing_events:
            # Time overlap check
            overlap = (new_event['start'] < e['end']) and (e['start'] < new_event['end'])
            if overlap:
                # Service overlap check
                shared_services = set(new_event['services']).intersection(set(e['services']))
                if shared_services:
                    conflicts.append({
                        "event_id": e['id'],
                        "type": "RESOURCE_CONTENTION",
                        "services": list(shared_services),
                        "severity": "HIGH"
                    })
                else:
                    conflicts.append({
                        "event_id": e['id'],
                        "type": "WINDOW_OVERLAP",
                        "severity": "MEDIUM"
                    })
        return conflicts

class ImpactAnalysisEngine:
    """Analyzes the risk and downtime impact of operational events."""
    
    def calculate_risk_score(self, event: Dict) -> float:
        # Simple risk model: severity based on duration and number of services
        duration_factor = (event['end'] - event['start']).total_seconds() / 3600
        service_factor = len(event['services'])
        
        # Weighted factors
        score = (duration_factor * 0.4) + (service_factor * 0.6)
        return min(100.0, score * 10)

if __name__ == "__main__":
    calendar = CalendarEngine()
    detector = ConflictDetectionEngine()
    impact = ImpactAnalysisEngine()
    
    # 1. Schedule Existing Event
    e1_start = datetime.now() + timedelta(days=1)
    calendar.schedule_event("Patch Cycle Q2", "PATCH", e1_start, 4, ["auth-service", "api-gateway"])
    
    # 2. Schedule Overlapping Event
    e2_start = e1_start + timedelta(hours=2)
    e2_spec = {
        "start": e2_start,
        "end": e2_start + timedelta(hours=2),
        "services": ["api-gateway"]
    }
    
    print(f"--- Service Continuity Intelligence ---")
    conflicts = detector.find_conflicts(e2_spec, calendar.list_events())
    print(f"Detected {len(conflicts)} conflicts for proposed window.")
    
    # 3. Analyze Risk
    risk_score = impact.calculate_risk_score(calendar.list_events()[0])
    print(f"Risk Score for Event 1: {risk_score}/100")
