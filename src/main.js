/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';

class RangeField extends Component {
	/**
	 * Handles the change of the input.
	 *
	 * @param  {Object} e
	 * @return {void}
	 */
	handleChange = (e) => {
		const { id, onChange } = this.props;

		onChange(id, e.target.value);
	};

	componentDidMount() {
		window.addEventListener('load', this.handleLoad);
	}

	handleLoad() {
		const range = document.querySelectorAll('.cf-range-field'),
			rangeV = document.querySelectorAll('.range-value'),
			setValue = (() => {
				for (let i = 0; i < range.length; i++) {
					const newValue = Number((range[i].value - range[i].min) * 100 / (range[i].max - range[i].min)),
						newPosition = 10 - newValue * 0.2;
					rangeV[i].innerHTML = `<span>${range[i].value}</span>`;
					rangeV[i].style.left = `calc(${newValue}% + (${newPosition}px))`;
				}
			})();
	}

	/**
	 * Render the component.
	 *
	 * @return {Object}
	 */
	render() {
		const { id, name, value, field } = this.props;

		const range = document.querySelectorAll('.cf-range-field');

		document.addEventListener('DOMContentLoaded', this.handleLoad);

		for (let i = 0; i < range.length; i++) {
			range[i].addEventListener('input', this.handleLoad);
		}

		return (
			<div class="cf-range-wrap">
				<div class="range-value" />
				<input
					type="range"
					id={id}
					name={name}
					value={value}
					className="cf-text__input cf-range-field"
					onChange={this.handleChange}
					{...field.attributes}
				/>
			</div>
		);
	}
}

export default RangeField;
