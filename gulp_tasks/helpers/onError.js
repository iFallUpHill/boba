module.exports = err => {
    console.log(err);
    this.emit('end');
};