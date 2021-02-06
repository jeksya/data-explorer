export default {
    Query: {
        vendors: (parent, args, { models }) => {
            return Object.values(models.vendors);
        },
        vendor: (parent, { path }, { models }) => {
            return models.files.filter(v => {return v.path === path});
        },
    },
    Vendor: {
        vendor_custom: (vendor, args, { models }) => {
            return Object.values(models.vendors);
        },
        get_files: (file, args, { models }) => {
            return Object.values(models.files).filter(
                f => f.path === file[0].path
            );
        },
    }
  };