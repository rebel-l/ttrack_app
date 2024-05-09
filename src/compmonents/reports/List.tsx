import "./List.scss";

import React from "react";
import { Table } from "react-bootstrap";

import { List } from "../../models/Reports";

interface IProps {
    readonly list: List
}

export default class ListComp extends React.Component<IProps, any> {
    constructor (props: IProps) {
        super(props);
    }

    render () {
        const { list } = this.props;

        if (!list) {
            return null;
        }

        return (
            <div>
                <h2>
                    {list.Year}
                    :
                    {" "}
                    {list.FirstDayOfYear.toLocaleString()}
                    {" "}
                    /
                    {" "}
                    {list.LastDayOfYear.toLocaleString()}
                </h2>
                <Table className="table small">
                    <tbody>
                        <tr>
                            <th>
                                Number of Days in the Year
                            </th>
                            <td>
                                {list.DaysInYear}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Number of Work Days in the Year
                            </th>
                            <td>
                                {list.WorkDaysInYear}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}
