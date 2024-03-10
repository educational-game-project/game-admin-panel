import { convertLevelLegend } from '../../utilities/stringUtils';

import type { RectangleProps, LegendProps, TooltipProps } from 'recharts';

export const RoundedBar = (props: RectangleProps) => {
  const { x, y, width, height } = props;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={8}
      ry={8}
      fill={props.fill}
    />
  );
};

export const CustomLegend = (props: LegendProps) => {
  const { payload } = props;

  return (
    <ul className="m-0 p-0 text-center list-none mt-2">
      {payload?.map((entry, index: number) => (
        <li
          key={`item-${index}`}
          className="inline-block mr-3.5">
          <div
            className="inline-block mr-1 align-middle size-3.5 rounded"
            style={{
              backgroundColor: entry?.color,
            }}
          />
          <span
            className="align-middle"
            style={{
              color: entry?.color,
            }}>
            {convertLevelLegend(entry?.value, 'short')}
          </span>
        </li>
      ))}
    </ul>
  );
};

export const CustomTooltip = (props: TooltipProps<string, string>) => {
  const { active, payload, label } = props;
  if (active && payload) {
    return (
      <div className="bg-gray-900 p-3 rounded-lg">
        <p className="text-gray-300 mb-0.5 text-3.25xs">{label}</p>
        {payload.map((data, index: number) => (
          <div
            key={index}
            className="flex items-center">
            <div
              className="size-3 rounded-full border-2 border-gray-300 mr-2"
              style={{ backgroundColor: data.color }}
            />
            <p className="text-3.25xs">
              <span className="text-gray-400">
                {convertLevelLegend(data?.dataKey, 'long')}:{' '}
              </span>
              <span className="font-medium text-gray-200">
                {data.value} pts
              </span>
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

// export const handleMouseEnter = (o) => {
//   const { dataKey } = o;
//   const { opacity } = this.state;

//   this.setState({
//     opacity: { ...opacity, [dataKey]: 0.5 },
//   });
// };

// export const handleMouseLeave = (o) => {
//   const { dataKey } = o;
//   const { opacity } = this.state;

//   this.setState({
//     opacity: { ...opacity, [dataKey]: 1 },
//   });
// };
