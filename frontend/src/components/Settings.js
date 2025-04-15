import React, { useState } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  border-top: 1px solid #2f3549;
`;

const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  color: #8a94ad;
  
  &:hover {
    color: #eff2f6;
  }
`;

const SettingsIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const SettingsContent = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  padding: 10px;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  color: #8a94ad;
  
  &:hover {
    color: #eff2f6;
  }
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2f3549;
    transition: .4s;
    border-radius: 24px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #7493e0;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoCategorize: true
  });

  const toggleSetting = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <SettingsContainer>
      <SettingsHeader onClick={() => setIsOpen(!isOpen)}>
        <SettingsIcon src={require('../icons/settingsIcon.svg')} alt="Settings" />
        Settings
      </SettingsHeader>
      <SettingsContent isOpen={isOpen}>
        <SettingItem>
          Dark Mode
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => toggleSetting('darkMode')}
            />
            <span className="slider"></span>
          </ToggleSwitch>
        </SettingItem>
        <SettingItem>
          Notifications
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => toggleSetting('notifications')}
            />
            <span className="slider"></span>
          </ToggleSwitch>
        </SettingItem>
        <SettingItem>
          Auto-categorize
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={settings.autoCategorize}
              onChange={() => toggleSetting('autoCategorize')}
            />
            <span className="slider"></span>
          </ToggleSwitch>
        </SettingItem>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings; 