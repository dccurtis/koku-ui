jest
  .mock('date-fns/start_of_month')
  .mock('date-fns/get_date')
  .mock('date-fns/format')
  .mock('date-fns/get_month');

import { ReportType } from 'api/reports';
import { ChartType } from 'components/commonChart/chartUtils';
import { Tabs } from 'components/tabs';
import formatDate from 'date-fns/format';
import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import startOfMonth from 'date-fns/start_of_month';
import { shallow } from 'enzyme';
import React from 'react';
import { DashboardTab } from 'store/dashboard';
import { mockDate } from 'testUtils';
import { FetchStatus } from '../../store/common';
import {
  DashboardWidgetBase,
  DashboardWidgetProps,
  getIdKeyForTab,
} from './dashboardWidget';

const props: DashboardWidgetProps = {
  widgetId: 1,
  id: 1,
  t: jest.fn(v => v),
  current: { data: [] },
  previous: { data: [] },
  fetchReports: jest.fn(),
  updateTab: jest.fn(),
  titleKey: 'title',
  reportType: ReportType.cost,
  trend: {
    type: ChartType.rolling,
    titleKey: 'trend title',
    formatOptions: {},
  },
  status: FetchStatus.none,
  currentQuery: '',
  previousQuery: '',
  details: {
    labelKey: 'detail label',
    labelKeyContext: 'label context',
    descriptionKeyRange: 'detail description range',
    descriptionKeySingle: 'detail description single',
    formatOptions: {},
  },
  topItems: { formatOptions: {} },
  availableTabs: [DashboardTab.accounts],
  currentTab: DashboardTab.accounts,
};

const getDateMock = getDate as jest.Mock;
const formatDateMock = formatDate as jest.Mock;
const startOfMonthMock = startOfMonth as jest.Mock;
const getMonthMock = getMonth as jest.Mock;

beforeEach(() => {
  mockDate();
  getDateMock.mockReturnValue(1);
  formatDateMock.mockReturnValue('formated date');
  startOfMonthMock.mockReturnValue(1);
  getMonthMock.mockReturnValue(1);
});

test('reports are fetched on mount', () => {
  shallow(<DashboardWidgetBase {...props} />);
  expect(props.fetchReports).toBeCalledWith(props.widgetId);
});

test('title is translated', () => {
  shallow(<DashboardWidgetBase {...props} />);
  expect(getTranslateCallForKey(props.titleKey)).toMatchSnapshot();
});

test('detail label is translated', () => {
  shallow(<DashboardWidgetBase {...props} />);
  expect(getTranslateCallForKey(props.details.labelKey)).toMatchSnapshot();
});

test('subtitle is translated with single date', () => {
  shallow(<DashboardWidgetBase {...props} />);
  expect(
    getTranslateCallForKey('dashboard_page.widget_subtitle')
  ).toMatchSnapshot();
});

test('subtitle is translated with date range', () => {
  getDateMock.mockReturnValueOnce(2);
  shallow(<DashboardWidgetBase {...props} />);
  expect(
    getTranslateCallForKey('dashboard_page.widget_subtitle')
  ).toMatchSnapshot();
});

test('trend title is translated', () => {
  shallow(<DashboardWidgetBase {...props} />);
  expect(getTranslateCallForKey(props.trend.titleKey)).toMatchSnapshot();
});

test('id key for dashboard tab is the tab name in singular form', () => {
  [DashboardTab.services, DashboardTab.accounts, DashboardTab.regions].forEach(
    value => {
      expect(getIdKeyForTab(value)).toEqual(value.slice(0, -1));
    }
  );

  expect(getIdKeyForTab(DashboardTab.instanceType)).toEqual(
    DashboardTab.instanceType
  );
});

test('change tab triggers updateTab', () => {
  const tabId = DashboardTab.regions;
  const view = shallow(<DashboardWidgetBase {...props} />);
  view.find(Tabs).simulate('change', { tabId });
  expect(props.updateTab).toBeCalledWith(props.id, { tabId });
});

function getTranslateCallForKey(key: string) {
  return (props.t as jest.Mock).mock.calls.find(([k]) => k === key);
}
