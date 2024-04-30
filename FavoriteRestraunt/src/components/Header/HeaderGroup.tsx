import React, { ReactElement } from 'react';
import { View } from 'react-native';

export const HeaderGroup: React.FC<{
  children: ReactElement[]
}> = (props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {props.children}
    </View>
  );
}

// export class HeaderGroup extends React.Component {
//   render() {
//     return (
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         {this.props.children}
//       </View>
//     )
//   }
// }