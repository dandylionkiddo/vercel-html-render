def generate_summary(data_list):
    if not data_list:
        return {"error": "데이터가 없습니다."}
    
    values = [d['value'] for d in data_list]
    avg_val = sum(values) / len(values)
    
    # 트렌드 계산 (최근 10개 데이터의 평균과 전체 평균 비교)
    recent_avg = sum(values[-10:]) / 10 if len(values) >= 10 else avg_val
    trend = "상승" if recent_avg > avg_val else "하락/유지"

    return {
        "period": f"{data_list[0]['date']} ~ {data_list[-1]['date']}",
        "count": len(data_list),
        "metrics": {
            "average": round(avg_val, 2),
            "max": max(values),
            "min": min(values)
        },
        "trend": trend
    }