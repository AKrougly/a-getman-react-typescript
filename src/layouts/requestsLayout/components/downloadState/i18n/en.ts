const enMsg = {
  csv: {
    main: {
      export: 'Export',
    },
    error: {
      noId: "Overwrite requires field 'id'",
      hasId: "Create should not include field 'id'",
      importing: 'Error importing',
      emptyResource:
        "The 'resource' property was empty, did you pass in the {...props} to the ImportButton?",
    },
    alert: {
      exported: 'Exported',
    },
    dialog: {
      exportTo: 'Export to',
      downloadItems: 'Copy data of items',
      extension: "then paste clipboard to editor",
      start: 'Start',
      processed: 'Processed',
      rowCount: 'Row Count',
      cancel: 'Cancel',
    },
  },
};

export default enMsg;