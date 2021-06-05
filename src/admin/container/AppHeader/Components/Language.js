import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import { LANGUAGE } from 'config/values';

const EN = 'en';
const NP = 'np';
const Language = () => {
  const [selectedLang, setSelectedLang] = useState(); //eslint-disable-line
  function handleClick(lang) {
    i18next.changeLanguage(lang);
    localStorage.setItem(LANGUAGE, lang);
    setSelectedLang(lang);
  }

  useEffect(() => {
    setSelectedLang(localStorage.getItem(LANGUAGE));
  }, [localStorage.getItem(LANGUAGE)]);

  return (
    <div className="mx-2">
      <span className="px-1" onClick={() => handleClick(NP)}>
        <img
          style={{ height: 30, cursor: 'pointer', width: 30 }}
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng4u.com%2Fwp-content%2Fuploads%2F2019%2F09%2Fnepal-flag-icon.png&f=1&nofb=1"
        />
      </span>
      <span className="px-1" onClick={() => handleClick(EN)}>
        <img
          style={{ height: 30, cursor: 'pointer', width: 30 }}
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F8%2F88%2FUnited-states_flag_icon_round.svg%2F768px-United-states_flag_icon_round.svg.png&f=1&nofb=1"
        />
      </span>
    </div>
  );
};

export default Language;
