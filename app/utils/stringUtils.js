export const getInitials = (name) => {
  let initials = Array.prototype.map
    .call(name.split(' '), function (x) {
      return x.substring(0, 1).toUpperCase();
    })
    .join('');
  return initials.substring(0, 2);
};

export const currencyFormat = (num) => {
  return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
