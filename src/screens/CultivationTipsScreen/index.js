import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

import CultivationTips from '../../components/Cultivation';
import {crops} from '../../utils/cropsData';

const CultivationTipsScreen = () => {
  const route = useRoute();
  const [crop, setCrop] = useState(route.params.crop);

  const handleCropChange = newCrop => {
    setCrop(newCrop);
  };

  return (
    <View style={styles.container}>
      <CultivationTips
        crop={crop}
        crops={crops}
        onCropChange={handleCropChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CultivationTipsScreen;
