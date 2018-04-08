import React from "react";
import { Form, Input } from "semantic-ui-react";

class DualGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ce: 0,
      te: 0,
      grade: ""
    };
    this.max = DualGroup.generateMax(this.props.subject, this.props.max);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  static generateMax(subject, max) {
    const generatedMax = {
      te: subject.te || max.te,
      ce: subject.ce || max.ce
    };
    return generatedMax;
  }
  generateGrade(ce, te, max) {
    const totalMax = max.ce + max.te;
    const totalMarks = (parseInt(ce) || 0) + (parseInt(te) || 0);
    const percentage = totalMarks / totalMax * 100;
    this.setState({
      grade: percentage
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {
        [name]: value
      },
      () => this.generateGrade(this.state.ce, this.state.te, this.max)
    );
  }
  render() {
    const { subject } = this.props;
    return (
      <Form.Group inline widths="equal">
        <Form.Field>
          <label>{subject.name}</label>
        </Form.Field>
        <Form.Field>
          <input
            placeholder="CE"
            name={`ce-${subject.code}`}
            className="mark-input"
            type="number"
            value={this.state.ce}
            min={0}
            max={this.max.ce}
            onChange={this.handleInputChange}
          />
          <label>/{this.max.ce}</label>
        </Form.Field>
        <Form.Field>
          <input
            placeholder="TE"
            name={`te-${subject.code}`}
            type="number"
            className="mark-input"
            value={this.state.te}
            min={0}
            max={this.max.te}
            onChange={this.handleInputChange}
          />
          <label>/{this.max.te}</label>
        </Form.Field>
        <Form.Field>
          <Input placeholder="Grade" readOnly value={this.state.grade} />
        </Form.Field>
      </Form.Group>
    );
  }
}

export default DualGroup;
