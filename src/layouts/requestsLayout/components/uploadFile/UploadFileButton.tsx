import React from 'react';
//import { resolveBrowserLocale, useLocale } from 'react-admin';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import spanishMessages from 'ra-language-spanish';
import chineseMessages from 'ra-language-chinese';

import * as domainMessages from './i18n';
import { ImportConfig } from './config.interface';

const UploadFileButton = (props) => {

  const locale = 'en'; //useLocale();
  const messages = {
    es: { ...spanishMessages, ...domainMessages.es },
    en: { ...englishMessages, ...domainMessages.en },
    cn: { ...chineseMessages, ...domainMessages.cn },
  };
  const i18nProvider = polyglotI18nProvider(
    (locale) => (messages[locale] ? messages[locale] : messages.en),
    locale /*|| resolveBrowserLocale()*/
  );

  let { variant, label, resource, resourceName } = props;

  if (ImportConfig.logging) {
    console.log({ props });
  }
//  if (!resource) {
//    throw new Error(i18nProvider.translate('csv.error.emptyResource'));
//  }

  if (!label) {
    label = i18nProvider.translate('csv.main.import');
  }

  if (!variant) {
    variant = 'text';
  }

  if (!resourceName) {
    resourceName = resource;
  }

  const [open, setOpen] = React.useState(false);

  const openImportDialog = (props) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = (error = false) => {
    handleClose();
  };

  const onFileAdded = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    props.onImport(file);
    handleComplete();
  };

  return (
    <>
      <Button
        title="Upload from file.json"
        variant="contained"
        color="default"
        size="small"
        disabled={props.disabled}
        startIcon={<PublishIcon />}
        onClick={openImportDialog}
      >
        Import
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {i18nProvider.translate('csv.dialog.importTo')} "{resourceName}"
        </DialogTitle>
        <DialogContent>
          <div id='alert-dialog-description' style={{ fontFamily: 'sans-serif' }}>
            <p style={{ margin: '0px' }}>{i18nProvider.translate('csv.dialog.dataFileReq')}</p>
            <ol>
              <li>{i18nProvider.translate('csv.dialog.extension')}</li>
              <li>{i18nProvider.translate('csv.dialog.idColumnCreate')}</li>
              <li>{i18nProvider.translate('csv.dialog.idColumnUpdate')}</li>
            </ol>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' component='label'>
            <span>{i18nProvider.translate('csv.dialog.chooseFile')}</span>
            <PublishIcon style={{ fontSize: '20' }} />
            <input
              type='file'
              style={{ display: 'none' }}
              onChange={onFileAdded}
              accept='.json,.txt'
            />
          </Button>
          <Button onClick={handleClose}>
            <span>{i18nProvider.translate('csv.dialog.cancel')}</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UploadFileButton;