import React from "react";
import { Table } from "react-bootstrap";
import { PublicHolidays } from "../../models/PublicHolidays";

interface IProps {
    readonly preview: PublicHolidays
}

class Preview extends React.Component<IProps> {
    constructor (props: IProps) {
        super(props);
    }

    render () {
        const { preview } = this.props;

        if(preview.length === 0) {
            return ("");
        }

        return (
            <Table>
                <thead>
                    <tr>
                        <th>
                            Date
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            HalfDay
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {preview.map((publicHoliday, index) => (
                        <tr key={`row-${index}`}>
                            <td key={`date-${index}`}>
                                {publicHoliday.Day}
                            </td>
                            <td key={`name-${index}`}>
                                {publicHoliday.Name}
                            </td>
                            <td key={`halfday-${index}`}>
                                {publicHoliday.HalfDay.toString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}

export default Preview;
