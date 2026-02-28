/**
 * @file 首页
 * @author ly
 * @createDate 2022年12月11日
 * https://antv.antgroup.com/
 */
import React from 'react';
import { Col, Row } from 'antd';
import AppCard from '@/components/antd/AppCard';
import DemoLine from './components/Line';
import DemoArea from './components/Area';
import DemoColumn from './components/Column';
import DemoPie from './components/Pie';
import DemoGauge from './components/Gauge';
import DemoLiquid from './components/Liquid';
import DemoWordCloud from './components/WordCloud';
import DemoMix from './components/Mix';

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Home = () => {
	return (
		<>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={12} lg={12} xl={6} className="mb-4">
					<AppCard>
						<DemoGauge divId="gauge1"></DemoGauge>
					</AppCard>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={6} className="mb-4">
					<AppCard>
						<DemoLiquid divId="liquid"></DemoLiquid>
					</AppCard>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={6} className="mb-4">
					<AppCard>
						<DemoWordCloud divId="wordCloud"></DemoWordCloud>
					</AppCard>
				</Col>
				<Col xs={24} sm={24} md={12} lg={12} xl={6} className="mb-4">
					<AppCard>
						<DemoMix divId="DemoMix"></DemoMix>
					</AppCard>
				</Col>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} className="mb-4">
					<AppCard>
						<DemoLine></DemoLine>
					</AppCard>
				</Col>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} className="mb-4">
					<AppCard>
						<DemoArea></DemoArea>
					</AppCard>
				</Col>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} className="mb-4">
					<AppCard>
						<DemoColumn></DemoColumn>
					</AppCard>
				</Col>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} className="mb-4">
					<AppCard>
						<DemoPie></DemoPie>
					</AppCard>
				</Col>
			</Row>
		</>
	);
};

export default Home;
