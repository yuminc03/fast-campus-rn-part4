import {render, waitFor} from '@testing-library/react-native';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import {HistoryListView} from './HistoryListView';

// database에서 ref().once() 해서 currentHistory 값을 받아오는 것을 mocking
jest.mock('@react-native-firebase/database', () => {
  return () => ({
    ref: jest.fn().mockImplementation(() => ({
      once: jest.fn().mockReturnValue(
        Promise.resolve({
          val: jest.fn().mockReturnValue({
            TEST: {
              url: 'test',
            },
          }),
        }),
      ),
    })),
  });
});

describe('HistoryListView Render Test', () => {
  const initialState = {};
  const mockStore = configureStore([thunk]);

  //@ts-ignore
  let store;

  beforeAll(() => {
    store = mockStore({
      user: {
        user: {
          uid: 'TEST_ID',
        },
      },
    });
  });

  test('HistoryLstView Render Sanpshot Test', async () => {
    const onPressItem = jest.fn();

    const component = render(
      //@ts-ignore
      <Provider store={store}>
        <HistoryListView onPressItem={onPressItem} />
      </Provider>,
    );

    await waitFor(() => component.findByTestId('Button0'), {
      timeout: 2000,
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});
