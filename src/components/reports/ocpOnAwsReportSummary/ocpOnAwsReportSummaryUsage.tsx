import { css } from '@patternfly/react-styles';
import { UsageChart, UsageChartProps } from 'components/charts/usageChart';
import React from 'react';
import { styles } from './ocpOnAwsReportSummaryTrend.styles';

const OcpOnAwsReportSummaryUsage: React.SFC<UsageChartProps> = props => (
  <div className={css(styles.chart)}>
    <UsageChart {...props} />
  </div>
);

export { OcpOnAwsReportSummaryUsage };
