import React from 'react';
import styled from 'styled-components';
import {StickyContainer, Sticky} from 'react-sticky';
import Run, {Header} from './SingleRun';
import Facts from './Facts';

const Container = styled.div`
	max-width: 900px;
	margin: auto;
`;

class Runs extends React.Component {
	state = {
		loading: true
	};
	componentDidMount() {
		fetch(
			process.env.NODE_ENV === 'production'
				? 'https://api.jonny.run/.netlify/functions/index'
				: 'http://localhost:1200'
		)
			.then(response => response.json())
			.then(response => {
				this.setState({
					loading: false,
					data: response
				});
			})
			.catch(err => {
				alert(`Could not load runs: ${err.message}`);
			});
	}
	render() {
		if (this.state.loading) {
			return 'Loading...';
		}
		return (
			<StickyContainer>
				<Container>
					<Facts runs={this.state.data} />
					<div style={{height: 80}} />
					<Sticky>
						{({style, isSticky}) => (
							<div style={{...style, ...(isSticky ? {zIndex: 2} : {})}}>
								<Header />
							</div>
						)}
					</Sticky>
					{this.state.data.map(r => {
						return <Run key={r.day} run={r} />;
					})}
					<div style={{height: 30}} />
				</Container>
			</StickyContainer>
		);
	}
}

export default Runs;
