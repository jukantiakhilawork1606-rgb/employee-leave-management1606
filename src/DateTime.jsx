import React, { useEffect, useState } from 'react'

const DateTime = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000); // 🔥 update every second for live time

        return () => clearInterval(interval);
    }, []);

    const quarter = Math.ceil((now.getMonth() + 1) / 3);

    return (
        <div>
            <div>
                <h1 className="LeaveDashboard_name">Leave Dashboard</h1>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                    <p className="subtitle">
                        {now.toLocaleString("en-US", {
                            weekday: "long",
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            // hour: "2-digit",
                            // minute: "2-digit",
                            // second: "2-digit",
                        })} · Q{quarter}
                    </p>

                    <p className="subtitle">
                        {now.toLocaleString("en-US", {

                            hour: "2-digit",
                            minute: "2-digit",
                            // second: "2-digit",
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DateTime;