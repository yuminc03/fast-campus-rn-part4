import React from 'react';
import {ImageProps, Image as RNImage, StyleProp} from 'react-native';

// export class RemoteImage extends React.Component {
//   render() {
//     return (
//       <RNImage
//         source={this.props.url}
//         style={[this.props.style, {
//           width: this.props.width,
//           height: this.props.height
//         } ]}
//       />
//     );
//   };
// }

export const RemoteImage: React.FC<{
  url: string;
  style?: StyleProp<ImageProps>;
  width: number;
  height: number;
}> = props => {
  return (
    <RNImage
      source={{uri: props.url}}
      style={[props.style, {width: props.width, height: props.height}]}
    />
  );
};
