import React from 'react';
//import { resolveBrowserLocale, useLocale } from 'react-admin';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

import polyglotI18nProvider from 'ra-i18n-polyglot';
import englishMessages from 'ra-language-english';
import spanishMessages from 'ra-language-spanish';
import chineseMessages from 'ra-language-chinese';

import * as domainMessages from './i18n';
import { ImportConfig } from './config.interface';

function DownloadStateButton(props) {

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
    label = i18nProvider.translate('csv.main.export');
  }

  if (!variant) {
    variant = 'text';
  }

  if (!resourceName) {
    resourceName = resource;
  }

  const [open, setOpen] = React.useState(false);

  const openExportDialog = (props) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComplete = (error = false) => {
    handleClose();
  };

  const handleCopy = async (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onExport();
    handleComplete();
  };

  return (
    <>
      <Button
        title="Download items to clipboard"
        variant="contained"
        color="default"
        size="small"
        disabled={props.disabled}
        startIcon={<GetAppIcon />}
        onClick={openExportDialog}
      >
        Export
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {i18nProvider.translate('csv.dialog.exportTo')} "{resourceName}"
        </DialogTitle>
        <DialogContent>
          <div id='alert-dialog-description' style={{ fontFamily: 'sans-serif' }}>
            <p style={{ margin: '0px' }}>{i18nProvider.translate('csv.dialog.downloadItems')}</p>
            <ol>
              <li>{i18nProvider.translate('csv.dialog.extension')}</li>
            </ol>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopy} variant='contained' component='label'>
            <GetAppIcon style={{ fontSize: '20' }} />
            <span>{i18nProvider.translate('csv.dialog.start')}</span>
          </Button>
          <Button onClick={handleClose}>
            <span>{i18nProvider.translate('csv.dialog.cancel')}</span>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DownloadStateButton;