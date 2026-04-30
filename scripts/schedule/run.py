import sys
from datetime import datetime, timedelta
from core.calendar.engine import CalendarEngine, ConflictDetectionEngine, ImpactAnalysisEngine

def run_scheduling_simulation():
    # 1. Initialize Engines
    calendar = CalendarEngine()
    detector = ConflictDetectionEngine()
    impact = ImpactAnalysisEngine()
    
    print("--- Service Continuity Scheduling Simulation ---")
    
    # 2. Schedule Initial Windows
    t1 = datetime.utcnow() + timedelta(days=2)
    calendar.schedule_event("Database Patching", "PATCH", t1, 4, ["core-db", "api-gateway"])
    
    t2 = datetime.utcnow() + timedelta(days=5)
    calendar.schedule_event("Regional DR Drill", "DR_TEST", t2, 12, ["auth-service", "api-gateway"])
    
    print(f"Scheduled {len(calendar.list_events())} baseline events in the calendar.")
    
    # 3. Simulate Conflict Detection
    t_new = t1 + timedelta(hours=2)
    new_event_spec = {
        "title": "Emergency Firewall Update",
        "start": t_new,
        "end": t_new + timedelta(hours=2),
        "services": ["api-gateway"]
    }
    
    print(f"\n[PROPOSE] Proposed Window: {new_event_spec['title']} at {new_event_spec['start']}")
    conflicts = detector.find_conflicts(new_event_spec, calendar.list_events())
    
    if conflicts:
        print(f"[CONFLICT] Detected {len(conflicts)} scheduling conflicts:")
        for c in conflicts:
            print(f"  - Event ID: {c['event_id']} | Type: {c['type']} | Severity: {c['severity']}")
            
    # 4. Impact Analysis
    e_dr = calendar.list_events()[1]
    risk = impact.calculate_risk_score(e_dr)
    print(f"\n[IMPACT] Risk Score for DR Drill: {risk}/100")

if __name__ == "__main__":
    run_scheduling_simulation()
