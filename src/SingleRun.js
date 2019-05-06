import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import StravaIcon from './strava-brands.svg';
import treadmill from './treadmill.svg';
import bandaid from './band-aid-solid.svg';
import thermometer from './thermometer.svg';
import {LOS_ANGELES, LONDON, SOFIA, LISBOA} from './timezones';
import Tooltip from './Tooltip';

const Row = styled.div`
	display: flex;
	flex-direction: row;
	font-family: 'Roboto Condensed';
	text-align: left;
	height: 36px;
	border-bottom: 1px solid black;
	align-items: center;
`;

const Day = styled.div`
	flex: 1;
`;

const Time = styled.div`
	flex: 1;
`;

const DateColumn = styled.div`
	flex: 2;
`;

const Distance = styled.div`
	flex: 1;
`;

const City = styled.div`
	flex: 2;
`;
const Country = styled.div`
	flex: 2;
`;
const StravaLink = styled.div`
	flex: 1;
`;

const Treadmill = styled.div`
	width: 30px;
	justify-content: center;
	align-items: center;
`;

const Injury = styled.div`
	width: 30px;
`;

const TreadmillIcon = () => (
	<img
		style={{width: 24, height: 24, marginTop: 6}}
		src={treadmill}
		alt="Treadmill"
	/>
);

const InjuryIcon = () => (
	<img
		style={{width: 20, height: 20, marginTop: 6}}
		src={bandaid}
		alt="Injury"
	/>
);

const SickIcon = () => (
	<img
		style={{width: 20, height: 20, marginTop: 6}}
		src={thermometer}
		alt="Sick"
	/>
);

export const Header = () => {
	return (
		<Row style={{background: 'white'}}>
			<DateColumn>Date</DateColumn>
			<Day>Time</Day>
			<Time>Day</Time>
			<Distance>Distance</Distance>
			<City>City</City>
			<Country>Country</Country>
			<StravaLink>Run</StravaLink>
			<Treadmill>
				<Tooltip content="Treadmill">
					<TreadmillIcon />
				</Tooltip>
			</Treadmill>
			<Injury>
				<Tooltip content="Injury">
					<InjuryIcon />
				</Tooltip>
			</Injury>
			<Injury>
				<Tooltip content="Sickness">
					<SickIcon />
				</Tooltip>
			</Injury>
		</Row>
	);
};

const getTime = run => {
	if (run.country === 'United States') {
		return new Date(new Date(run.date).getTime() + LOS_ANGELES);
	}
	if (run.country === 'United Kingdom') {
		return new Date(new Date(run.date).getTime() + LONDON);
	}
	if (run.country === 'Bulgaria') {
		return new Date(new Date(run.date).getTime() + SOFIA);
	}
	if (run.country === 'Portugal') {
		return new Date(new Date(run.date).getTime() + LISBOA);
	}
	return new Date(run.date);
};

class SingleRun extends React.Component {
	render() {
		return (
			<Row>
				<DateColumn>
					{format(
						new Date(addDays(new Date('2016-02-18'), this.props.run.day)),
						'dd.MM.YYY'
					)}
				</DateColumn>
				<Day>
					{this.props.run.date
						? format(getTime(this.props.run), 'h:mmaaaa').replace(/\./g, '')
						: null}
				</Day>
				<Time>{this.props.run.day}</Time>
				<Distance>
					{this.props.run.distance
						? (this.props.run.distance / 1000).toFixed(1) + 'km'
						: '?'}
				</Distance>
				<City>{this.props.run.city}</City>
				<Country>{this.props.run.country}</Country>
				<StravaLink>
					{this.props.run.strava_id ? (
						<Tooltip
							content={
								<div style={{width: 110, textAlign: 'center'}}>
									See Run on Strava
								</div>
							}
							placement="top"
						>
							<a
								target="_blank"
								rel="noopener noreferrer"
								href={`https://strava.com/activities/${
									this.props.run.strava_id
								}`}
							>
								<img
									style={{
										height: 24,
										width: 24,
										marginTop: 3
									}}
									src={StravaIcon}
									alt="Strava activity"
								/>
							</a>
						</Tooltip>
					) : null}
				</StravaLink>
				<Treadmill>
					{this.props.run.treadmill ? (
						<Tooltip
							content={
								<div style={{whiteSpace: 'nowrap'}}>
									{this.props.run.treadmill}
								</div>
							}
						>
							<TreadmillIcon />
						</Tooltip>
					) : null}
				</Treadmill>
				<Injury>
					{this.props.run.injured ? (
						<Tooltip
							content={
								<div style={{width: 200}}>
									<strong>Injury:</strong>
									<br />
									{this.props.run.injured}
								</div>
							}
						>
							<InjuryIcon />
						</Tooltip>
					) : null}
				</Injury>
				<Injury>
					{this.props.run.sick ? (
						<Tooltip
							content={
								<div style={{width: 200}}>
									<strong>Sickness:</strong>
									<br />
									{this.props.run.sick}
								</div>
							}
						>
							<SickIcon />
						</Tooltip>
					) : null}
				</Injury>
			</Row>
		);
	}
}
export default SingleRun;
