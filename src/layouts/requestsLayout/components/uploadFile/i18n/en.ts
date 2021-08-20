const enMsg = {
  csv: {
    main: {
      import: 'Import',
    },
    error: {
      noId: "Overwrite requires field 'id'",
      hasId: "Create should not include field 'id'",
      importing: 'Error importing',
      emptyResource:
        "The 'resource' property was empty, did you pass in the {...props} to the ImportButton?",
    },
    alert: {
      imported: 'Imported',
    },
    dialog: {
      importTo: 'Import to',
      dataFileReq: 'Data file requirements',
      extension: "Must be a '.json' or '.txt' file",
      idColumnCreate: "Must be an array of items object",
      idColumnUpdate: "For example [{\"prop1\": \"value1\", \"prop2\": \"value2\", ...}]",
      chooseFile: 'Choose File',
      processed: 'Processed',
      rowCount: 'Row Count',
      cancel: 'Cancel',
      importNew: 'Import as New',
      importOverride: 'Import as Overwrite ',
    },
  },
};

export default enMsg;
