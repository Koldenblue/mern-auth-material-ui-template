import React from 'react'

export default function WatercolorBackground() {

  let styles = {
    waterBg: {
      position: 'absolute',
      width: '50%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '-2em'
    }
  }
  return (<>
    <img src={require('../../assets/images/watercolor-background.png')} style={styles.waterBg} />
  </>)
}