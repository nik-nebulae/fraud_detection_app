from .database import get_connection


def insert_transaction(time, amount, fraud_probability, decision):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO transactions (time, amount, fraud_probability, decision)
    VALUES (?, ?, ?, ?)
    """, (time, amount, fraud_probability, decision))

    conn.commit()
    conn.close()


def get_transactions(limit=50):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id, time, amount, fraud_probability, decision, created_at
    FROM transactions
    ORDER BY created_at DESC
    LIMIT ?
    """, (limit,))

    rows = cursor.fetchall()
    conn.close()

    # Convert to list of dicts (for API response later)
    transactions = []
    for row in rows:
        transactions.append({
            "id": row[0],
            "time": row[1],
            "amount": row[2],
            "fraud_probability": row[3],
            "decision": row[4],
            "created_at": row[5]
        })

    return transactions

