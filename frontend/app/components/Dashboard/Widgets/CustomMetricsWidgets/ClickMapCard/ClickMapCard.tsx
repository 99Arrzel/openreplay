import React from 'react';
import { useStore } from 'App/mstore';
import { observer } from 'mobx-react-lite';
import ClickMapRenderer from 'App/components/Session/Player/ClickMapRenderer';
import { NoContent, Icon } from 'App/components/ui';

function ClickMapCard() {
  const [customSession, setCustomSession] = React.useState<any>(null);
  const { metricStore, dashboardStore, sessionStore } = useStore();
  const fetchInsights = sessionStore.fetchInsights;
  const insights = sessionStore.insights;
  const onMarkerClick = (s: string, innerText: string) => {
    metricStore.changeClickMapSearch(s, innerText);
  };

  const sessionId = metricStore.instance.data.sessionId;
  const url = metricStore.instance.data.path;
  const operator = metricStore.instance.series[0].filter.filters[0].operator


  React.useEffect(() => {
    return () => setCustomSession(null);
  }, []);

  React.useEffect(() => {
    if (
      metricStore.instance.data.domURL &&
      sessionId &&
      sessionId !== customSession?.sessionId
    ) {
      setCustomSession(null);
      setTimeout(() => {
        setCustomSession(metricStore.instance.data);
      }, 100);
    }
  }, [metricStore.instance, sessionId]);

  React.useEffect(() => {
    if (!url || !sessionId) return;
    const rangeValue = dashboardStore.drillDownPeriod.rangeValue;
    const startDate = dashboardStore.drillDownPeriod.start;
    const endDate = dashboardStore.drillDownPeriod.end;
    void fetchInsights({
      url: url || '/',
      startDate,
      endDate,
      rangeValue,
      clickRage: metricStore.clickMapFilter,
      operator,
    });
  }, [
    sessionId,
    url,
    dashboardStore.drillDownPeriod.start,
    dashboardStore.drillDownPeriod.end,
    dashboardStore.drillDownPeriod.rangeValue,
    metricStore.clickMapFilter,
  ]);

  if (!metricStore.instance.data.domURL || insights.length === 0) {
    return (
      <NoContent
        style={{ minHeight: 220 }}
        title={
          <div className="flex items-center relative">
            <Icon name="info-circle" className="mr-2" size="14" />
            No data available for the selected period.
          </div>
        }
        show={true}
      />
    );
  }

  if (!metricStore.instance.data?.sessionId || !customSession) {
    return <div className="py-2">Loading session</div>;
  }

  const jumpToEvent = metricStore.instance.data.events.find(
    (evt: Record<string, any>) => {
      if (url) return evt.path.includes(url);
      return evt;
    }
  ) || { timestamp: metricStore.instance.data.startTs };
  const ts = jumpToEvent.timestamp ?? metricStore.instance.data.startTs;
  const domTime = jumpToEvent.domBuildingTime ?? 0;
  const jumpTimestamp = ts - metricStore.instance.data.startTs + domTime + 99; // 99ms safety margin to give some time for the DOM to load
  return (
    <div id="clickmap-render">
      <ClickMapRenderer
        session={customSession}
        jumpTimestamp={jumpTimestamp}
        onMarkerClick={onMarkerClick}
      />
    </div>
  );
}

export default observer(ClickMapCard);
