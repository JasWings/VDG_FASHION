import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowUp } from '@/components/icons/arrow-up';
import { ArrowDown } from '@/components/icons/arrow-down';
import Chart from '@/components/ui/chart';
import { useState } from 'react';

const BarChart = ({
  widgetTitle,
  series,
  colors,
  prefix,
  totalValue,
  text,
  position,
  percentage,
  categories,
}: any) => {
    const options = {
        options: {
          chart: {
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              columnWidth: '65%',
              endingShape: 'flat',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: false,
            width: 2,
          },
          grid: {
            borderColor: '#F7F7F7',
            xaxis: {
              lines: {
                show: false,
              },
            },
          },
          colors: colors,
          xaxis: {
            labels: {
              show: true,
              style: {
                colors: '#161F6A',
                fontSize: '14px',
                fontFamily: "'Lato', sans-serif",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            categories: categories,
          },
          yaxis: {
            show: true,
            labels: {
              show: true,
              style: {
                color: '#161F6A',
                fontSize: '14px',
                fontFamily: "'Lato', sans-serif",
              },
            },
          },
        },
        series: [
          {
            name: 'Sale',
            data: series,
          },
        ],
      };

      return (
    <Box h="100%" w="100%" rounded="md" bg="white" boxShadow="sm">
      <Flex alignItems="center" justifyContent="space-between" p={8}>
        <Text fontSize="sm" fontWeight="bold" color="heading">
          {widgetTitle}
        </Text>

        <Flex flexDirection="column">
          <Text fontSize="lg" fontWeight="semibold" color="green.500">
            {prefix}
            {totalValue}
          </Text>

          <Flex alignItems="center">
            {position === 'up' && <ArrowUp color="green.500" />}
            {position === 'down' && <ArrowDown color="red.400" />}
            <Text fontSize="sm" fontWeight="bold" color={position === 'down' ? 'red.400' : 'green.500'} ml="1">
              {percentage}&nbsp;{text}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex w="100%" flexWrap="wrap" display="block">
      <Chart
          options={options.options}
          series={options.series}
          height="350"
          width="100%"
          type="bar"
       />
      </Flex>
    </Box>
  );
};

export default BarChart;
