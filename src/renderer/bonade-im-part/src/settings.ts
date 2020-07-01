interface ISettings {
  title: string; // Overrides the default title
  showSettings: boolean; // Controls settings panel display
}

// You can customize below settings :)
const settings: ISettings = {
  'title': 'Vue Typescript Admin',
  'showSettings': true
};

export default settings;
