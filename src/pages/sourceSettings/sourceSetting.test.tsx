import { Toolbar } from '@patternfly/react-core';
import { shallow } from 'enzyme';
import React from 'react';
import { FetchStatus } from 'store/common';
import NoSourcesState from './noSourcesState';
import SourceSettings from './sourceSettings';

test('hide toolbar when fetch in progress or none', () => {
  const props = {
    sources: [],
    error: null,
    status: FetchStatus.inProgress,
    fetch: jest.fn(),
    remove: jest.fn(),
    showDeleteDialog: jest.fn(),
    onAdd: jest.fn(),
    t: jest.fn(v => v),
    query: {},
  };
  let view = shallow(<SourceSettings {...props} />);
  expect(view.find(Toolbar)).toHaveLength(0);
  view = shallow(<SourceSettings {...props} status={FetchStatus.none} />);
  expect(view.find(Toolbar)).toHaveLength(0);
});

test('display toolbar when fetch completed and there is at least one result', () => {
  const props = {
    sources: [
      {
        name: 'name',
        type: 'type',
        uuid: 'uuid',
        customer: { date_created: new Date() },
        authentication: {
          provider_uuid: 'provider_uuid',
        },
        created_by: {
          username: 'username',
        },
      },
    ],
    error: null,
    status: FetchStatus.complete,
    fetch: jest.fn(),
    remove: jest.fn(),
    showDeleteDialog: jest.fn(),
    onAdd: jest.fn(),
    t: jest.fn(v => v),
    query: {},
    pagination: { count: 1 },
  };
  const view = shallow(<SourceSettings {...props} />);
  expect(view.find(Toolbar)).toHaveLength(1);
});

test('display empty state w/o toolbar when fetch completed and no results', () => {
  const props = {
    sources: [],
    error: null,
    status: FetchStatus.complete,
    fetch: jest.fn(),
    remove: jest.fn(),
    showDeleteDialog: jest.fn(),
    onAdd: jest.fn(),
    t: jest.fn(v => v),
    query: {},
  };
  const view = shallow(<SourceSettings {...props} />);
  expect(view.find(Toolbar)).toHaveLength(0);
  expect(view.find(NoSourcesState)).toHaveLength(1);
});
