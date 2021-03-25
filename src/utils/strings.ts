export default class Strings {
  static idToVerboseId(id: string): string {
    if (id) {
      return id.split('-')[0];
    }
    return '';
  }
}
