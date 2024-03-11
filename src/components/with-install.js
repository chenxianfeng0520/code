function widthInstall(comp) {
  comp.install = (app) => {
    const { name } = comp;
    app.component(name, comp);
  };
  return comp;
}

export { widthInstall };
