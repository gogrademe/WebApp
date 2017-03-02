/**
 * asForm Higher Order Component
 */
import * as React from 'react';

export default function asForm (MyComponent, formDataProp) {
  return class Form extends React.Component<any,undefined> {
    updateProperty = (key:string, value: any) => {
      this.props[formDataProp][key] = value
    }

    render () {
      return <MyComponent {...this.props} updateProperty={this.updateProperty}/>
    }
  }
}
