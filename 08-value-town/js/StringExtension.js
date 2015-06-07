String.prototype.startsWith = function(str) {
  return (this.match("^"+str)==str);
}

String.prototype.endsWith = function(str)  {
  return (this.match(str+"$")==str);
}
