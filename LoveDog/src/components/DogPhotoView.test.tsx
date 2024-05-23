import {render, screen, waitFor} from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';

import {DogPhotoView} from './DogPhotoView';
import {api} from '../utils/AxiosUtils';

describe('DogPhoto Render Test', () => {
  let mock: MockAdapter;

  // 모든 테스트가 돌기 전 실행됨
  beforeAll(() => {
    mock = new MockAdapter(api);
  });

  // 모든 테스트가 끝났을 때
  afterAll(() => {
    mock.reset();
  });

  test('DogPhotoView Render Snapshot', async () => {
    mock.onGet(new RegExp('/breeds/image/random')).reply(200, {
      message: 'TEST_MESSAGE',
      status: 'SUCCESS',
    });

    const component = render(<DogPhotoView />);
    // 특정 component를 찾을 때까지 기다림 (2초 동안)
    await waitFor(() => component.findByTestId('image'), {timeout: 2000});

    expect(screen.toJSON()).toMatchSnapshot();
  });
});
