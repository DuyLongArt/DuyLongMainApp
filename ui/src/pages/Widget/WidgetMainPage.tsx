import React, { useState, useEffect } from 'react';
interface WidgetData {
  id: number;
  name: string;
  value: number;
}

const WidgetMainPage: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchWidgets = async () => {
      try {
        // In a real app, replace with actual API call
        setTimeout(() => {
          const mockData: WidgetData[] = [
            { id: 1, name: "CPU Usage", value: 45 },
            { id: 2, name: "Memory Usage", value: 72 },
            { id: 3, name: "Disk Space", value: 33 }
          ];
          setWidgets(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("Failed to fetch widget data");
        setLoading(false);
      }
    };

    fetchWidgets();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refreshing data
    setTimeout(() => {
      const updatedData = widgets.map(widget => ({
        ...widget,
        value: Math.floor(Math.random() * 100)
      }));
      setWidgets(updatedData);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="widget-container">
      <header className="widget-header">
        <h1>Widget Dashboard</h1>
        <button 
          onClick={handleRefresh}
          disabled={loading}
          className="refresh-button"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </header>

      <main className="widget-content">
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading-spinner">Loading widgets...</div>
        ) : (
          <div className="widgets-grid">
            {widgets.map(widget => (
              <div key={widget.id} className="widget-card">
                <h3>{widget.name}</h3>
                <div className="widget-value">{widget.value}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${widget.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="widget-footer">
        <p>© 2025 Widget Dashboard</p>
      </footer>
    </div>
  );
};

export default WidgetMainPage;