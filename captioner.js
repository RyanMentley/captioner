function Captioner(audioElement, captionElement, captionArray) {
	this.audioElement = audioElement;
	this.captionElement = captionElement;
	this.captionArray = captionArray;
	this.captionIndex = 0;
	this.captionDisplayed = false;
	this.updateCaptions = function() {
		var captionUpdateNeeded = false;
		var time = this.audioElement.currentTime;

		// Do we need to advance to the next caption?
		if (this.captionIndex < this.captionArray.length) {
			if (time > this.captionArray[this.captionIndex][0]) {
				captionUpdateNeeded = true;
				this.captionIndex++;
			}
		}

		// Backtrack if needed (in case audio position is moved backward)
		while (this.captionIndex > 0 && this.captionArray[this.captionIndex - 1][0] > time) {
			this.captionIndex--;
			captionUpdateNeeded = true;
		}

		// Update caption
		if (captionUpdateNeeded || !captionDisplayed) {
			this.captionElement.innerHTML = this.captionArray[this.captionIndex - 1][1];
			captionDisplayed = true;
		}
	};
	this.removeCaptions = function() {
		this.captionElement.innerHTML = "&nbsp;";
		captionDisplayed = false;
	};
	captioner = this;
	audioElement.addEventListener('timeupdate',
			function() {
				captioner.updateCaptions();
			});
	audioElement.addEventListener('ended',
			function() {
				captioner.removeCaptions();
			});
}