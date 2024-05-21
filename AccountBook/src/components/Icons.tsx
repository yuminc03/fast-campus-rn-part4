import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// export class Icon extends React.Component {
//   render() {
//     return (
//       <Ionicons
//         name={this.props.name}
//         size={this.props.size}
//         color={this.props.color}
//       />
//     );
//   }
// }

export type IconName = string;

export const Icon: React.FC<{
  name: IconName;
  size: number;
  color: string;
}> = props => {
  return <Ionicons name={props.name} size={props.size} color={props.color} />;
};
