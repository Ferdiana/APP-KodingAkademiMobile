import React, {useState} from 'react';
import {FormControl, Input, Button, Modal} from 'native-base';

const AlertInput = ({
  handleAlertClose,
  name,
  label,
  placeholder,
  value,
  onChangeText,
  handleAlertSave,
}) => {
  return (
    <Modal isOpen={true} onClose={handleAlertClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{name}</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>{label}</FormControl.Label>
            <Input
              bgColor={'transparent'}
              focusOutlineColor={'neutral.200'}
              placeholder={placeholder}
              value={value}
              onChangeText={onChangeText}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={handleAlertClose}>
              Cancel
            </Button>
            <Button onPress={handleAlertSave}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
export default AlertInput;
