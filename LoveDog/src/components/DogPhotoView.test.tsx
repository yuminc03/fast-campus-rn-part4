import {render, screen, waitFor} from '@testing-library/react-native';

import {DogPhotoView} from './DogPhotoView';

test('DogPhotoView Render Test', async () => {
  const component = render(<DogPhotoView />);

  // 특정 component를 찾을 때까지 기다림 (2초 동안)
  await waitFor(() => component.findByTestId('image'), {timeout: 2000});

  expect(screen.toJSON()).toMatchSnapshot();
});
